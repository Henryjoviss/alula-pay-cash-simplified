import { hashPin, verifyPin } from "./pin-hash";

export type SignupInput = {
  phone: string;
  firstName: string;
  lastName: string;
  pin: string;
  email: string;
  incomeSource: string;
};
export type SignupResult = { ok: true } | { ok: false; error: string };

export type LoginInput = { phone: string; pin: string };
export type LoginUser = {
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  incomeSource: string;
};
export type LoginResult = { ok: true; user: LoginUser } | { ok: false; error: string };

type StoredUser = LoginUser & { pinHash: string; createdAt: number };

// Accounts live in this browser only. No server or database is involved.
const KEY = "alula-pay-accounts-v1";

function readAll(): StoredUser[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(users: StoredUser[]): boolean {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(users));
    return true;
  } catch {
    return false;
  }
}

export async function signupUser({ data }: { data: SignupInput }): Promise<SignupResult> {
  const pinHash = await hashPin(data.pin);
  // Signing up again with the same number replaces the old account on this
  // device, so repeated demo signups never lock you out.
  const others = readAll().filter((u) => u.phone !== data.phone);
  others.push({
    phone: data.phone,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email || "",
    incomeSource: data.incomeSource || "",
    pinHash,
    createdAt: Date.now(),
  });
  if (!writeAll(others)) {
    return { ok: false, error: "Couldn't save your account on this device. Check your browser storage settings." };
  }
  return { ok: true };
}

export async function loginUser({ data }: { data: LoginInput }): Promise<LoginResult> {
  const row = readAll().find((u) => u.phone === data.phone);
  if (!row) return { ok: false, error: "No account found with that mobile number." };

  const valid = await verifyPin(data.pin, row.pinHash);
  if (!valid) return { ok: false, error: "Incorrect PIN." };

  return {
    ok: true,
    user: {
      phone: row.phone,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      incomeSource: row.incomeSource,
    },
  };
                                            }
