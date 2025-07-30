'use client';

import { Menu } from '@headlessui/react';
import { useState } from 'react';

interface DropdownProps {
  options: string[];
  selected: string;
  onChange?: (value: string) => void;
}

export default function Dropdown({ options, selected, onChange }: DropdownProps) {
  const handleSelect = (value: string) => {
    onChange?.(value); // notify parent if callback provided
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="rounded bg-background-header px-4 sm:px-12 py-1 sm:py-3 text-sm text-white flex items-center gap-2 data-active:bg-background-header-dark data-hover:bg-background-header-dark hover:cursor-pointer">
        {selected}
      </Menu.Button>

      <Menu.Items className="absolute mt-2 w-56 bg-white border rounded shadow-lg">
        {options.map((option) => (
          <Menu.Item key={option}>
            {({ active }) => (
              <button
                onClick={() => handleSelect(option)}
                className={`${
                  active ? 'bg-gray-100' : ''
                } w-full text-left px-4 py-2`}
              >
                {option}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}