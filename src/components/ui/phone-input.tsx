"use client";

import { Input } from "@/src/components/ui/input";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

function formatPhone(value: string) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (numbers.length <= 2) {
    return numbers;
  }

  if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }

  return `(${numbers.slice(0, 2)}) ${numbers.slice(
    2,
    7
  )}-${numbers.slice(7)}`;
}

export function PhoneInput({
  value,
  onChange,
}: PhoneInputProps) {
  return (
    <Input
      placeholder="(11) 99999-9999"
      value={formatPhone(value)}
      onChange={(e) => {
        const numbers = e.target.value.replace(/\D/g, "");
        onChange(numbers);
      }}
    />
  );
}