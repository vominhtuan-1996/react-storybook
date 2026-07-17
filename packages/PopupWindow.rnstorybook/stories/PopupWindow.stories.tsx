import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pressable, Text, View } from 'react-native';
import { PopupWindow } from '../src/PopupWindow';

function MenuItem({ label }: { label: string }) {
  return (
    <Pressable style={{ height: 36, justifyContent: 'center', paddingHorizontal: 8 }}>
      <Text style={{ color: '#E2E8F0', fontSize: 14 }}>{label}</Text>
    </Pressable>
  );
}

function PopupWindowDemo({ disabled = false }: { disabled?: boolean }) {
  const anchorRef = useRef<View>(null);
  const [open, setOpen] = useState(false);

  return (
    <View style={{ padding: 40 }}>
      <View ref={anchorRef} collapsable={false}>
        <Pressable
          onPress={() => setOpen((v) => !v)}
          disabled={disabled}
          style={{
            height: 44,
            paddingHorizontal: 16,
            borderRadius: 8,
            backgroundColor: '#1E293B',
            justifyContent: 'center',
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <Text style={{ color: '#E2E8F0' }}>Open menu</Text>
        </Pressable>
      </View>

      <PopupWindow
        visible={open}
        onClose={() => setOpen(false)}
        anchorRef={anchorRef}
        disabled={disabled}
      >
        <MenuItem label="Edit" />
        <MenuItem label="Duplicate" />
        <MenuItem label="Delete" />
      </PopupWindow>
    </View>
  );
}

const meta: Meta<typeof PopupWindowDemo> = {
  title: 'Components/PopupWindow',
  component: PopupWindowDemo,
};

export default meta;
type Story = StoryObj<typeof PopupWindowDemo>;

export const BottomStart: Story = {
  args: {},
};

export const Disabled: Story = {
  args: { disabled: true },
};
