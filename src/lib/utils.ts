import { clsx, type ClassValue } from "clsx";
import { formatUnits } from "ethers";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatNumber(value: bigint | number): string {
  const num =
    typeof value === "bigint" ? Number(formatUnits(value, 18)) : value;
  if (num < 10000) return num.toString();

  const units = [
    { value: 1_000_000_000_000, suffix: "T" },
    { value: 1_000_000_000, suffix: "B" },
    { value: 1_000_000, suffix: "M" },
    { value: 1_000, suffix: "K" },
  ];

  for (const unit of units) {
    if (num >= unit.value) {
      const exact = num % unit.value === 0;
      const formatted = (num / unit.value).toFixed(1).replace(/\.0$/, "");
      return exact
        ? `${formatted}${unit.suffix}`
        : `${formatted}${unit.suffix}+`;
    }
  }
  return num.toString();
}

export function formatTimestamp(timestamp: bigint): string {
  const date = new Date(Number(timestamp * 1000n));
  if (isNaN(date.getTime())) return "Invalid date";
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function format(num: string) {
  const intPart = num.split(".")[0];
  if (intPart.length > 8) return formatNumber(BigInt(intPart));
  return formatNumber(Number(intPart));
}

export function formatTimeRemaining(blockTimestamp: bigint | number): string {
  const futureTime = Number(blockTimestamp) * 1000;
  const now = Date.now();
  const diff = futureTime - now;
  if (diff <= 0)return "0d 0h 0m";
  let seconds = Math.floor(diff / 1000);
  const days = Math.floor(seconds / (3600 * 24));
  seconds %= 3600 * 24;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  if (days > 0)    return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0)    return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function checkClaimable(data: number) { 
  return data<=0
}
export function formatTimeAgo(lastUpdateTime: number): string {
  const now = Math.floor(Date.now() / 1000); 
  let diff = now - lastUpdateTime;
  const days = Math.floor(diff / (60 * 60 * 24));
  diff %= 60 * 60 * 24;

  const hours = Math.floor(diff / (60 * 60));
  diff %= 60 * 60;

  const minutes = Math.floor(diff / 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);

  if (parts.length === 0) return "just now";

  return parts.join(" ") + " ago";
}
