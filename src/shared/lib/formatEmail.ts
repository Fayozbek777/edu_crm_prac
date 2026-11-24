export function formatEmail(raw: string | null | undefined): string {
  if (!raw) return "—";
  return raw.trim().toLowerCase();
}

// export function maskEmail(raw: string | null | undefined): string {
//   if (!raw) return "—";
//   const email = raw.trim().toLowerCase();
//   const at = email.indexOf("@");
//   if (at <= 0) return email;
//   const name = email.slice(0, at);
//   const domain = email.slice(at);
//   const visible = name.slice(0, Math.min(2, name.length));
//   return `${visible}***${domain}`;
// }
