"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
	return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-3", className)} {...props} />;
}

function RadioGroupItem({ className, value, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
	return (
		<RadioGroupPrimitive.Item
			data-slot="radio-group-item"
			value={value}
			className={cn(
				"border-input text-primary aspect-square size-9 shrink-0 rounded-full border text-base font-medium tabular-nums shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50",
				"data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
				className
			)}
			{...props}
		>
			{value}
		</RadioGroupPrimitive.Item>
	);
}

export { RadioGroup, RadioGroupItem };
