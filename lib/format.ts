export const money = (value: number) => `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const initials = (name: string) => name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

