import { forwardRef, useRef, useState } from 'react';
import { Animated, Pressable, Text, TextInput, View } from 'react-native';
import type { TextFieldProps } from './TextField.types';
import { borderColorFor, colors, styles } from './TextField.styles';
import { useKeyboardAvoidance } from './useKeyboardAvoidance';

type Status = 'default' | 'error' | 'success';

export const TextField = forwardRef<TextInput, TextFieldProps>(
  (
    {
      label,
      helperText,
      errorText,
      successText,
      showCount,
      required,
      disabled,
      editable,
      secureTextEntry,
      maxLength,
      value,
      defaultValue,
      onFocus,
      onBlur,
      testID,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [revealPassword, setRevealPassword] = useState(false);
    const [togglePressed, setTogglePressed] = useState(false);

    const wrapperRef = useRef<View>(null);
    const translateY = useKeyboardAvoidance(wrapperRef, isFocused);

    const status: Status = errorText ? 'error' : successText ? 'success' : 'default';
    const readOnly = editable === false;
    const isPassword = !!secureTextEntry;
    const currentLength = (value ?? defaultValue ?? '').length;

    return (
      <Animated.View
        ref={wrapperRef}
        style={[styles.container, { transform: [{ translateY }] }]}
      >
        <View style={styles.labelRow}>
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
          {showCount && maxLength ? (
            <Text style={styles.count}>
              {currentLength}/{maxLength}
            </Text>
          ) : null}
        </View>

        <View
          style={[
            styles.fieldWrap,
            { borderColor: borderColorFor(status, isFocused) },
            readOnly && styles.fieldWrapReadOnly,
            disabled && styles.fieldWrapDisabled,
          ]}
        >
          <TextInput
            ref={ref}
            style={styles.input}
            placeholderTextColor={colors.placeholder}
            editable={!disabled && editable !== false}
            secureTextEntry={isPassword && !revealPassword}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            accessibilityLabel={label}
            accessibilityState={{ disabled: !!disabled }}
            testID={testID}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            {...props}
          />

          {status === 'success' && !isPassword ? (
            <Text style={{ color: colors.iconSuccess, fontWeight: '700' }}>✓</Text>
          ) : null}
          {status === 'error' && !isPassword ? (
            <Text style={{ color: colors.iconError, fontWeight: '700' }}>!</Text>
          ) : null}

          {isPassword && !disabled ? (
            <Pressable
              onPress={() => setRevealPassword((prev) => !prev)}
              onPressIn={() => setTogglePressed(true)}
              onPressOut={() => setTogglePressed(false)}
              accessibilityRole="button"
              accessibilityLabel={revealPassword ? 'Hide password' : 'Show password'}
              style={[styles.toggleButton, togglePressed && styles.toggleButtonPressed]}
            >
              <Text style={{ color: colors.toggleIcon, fontSize: 12, fontWeight: '600' }}>
                {revealPassword ? 'Hide' : 'Show'}
              </Text>
            </Pressable>
          ) : null}
        </View>

        {helperText || errorText || successText ? (
          <Text
            style={[
              styles.helperText,
              {
                color:
                  status === 'error'
                    ? colors.helperError
                    : status === 'success'
                      ? colors.helperSuccess
                      : colors.helperDefault,
              },
            ]}
            accessibilityLiveRegion={status === 'error' ? 'assertive' : 'polite'}
          >
            {errorText || successText || helperText}
          </Text>
        ) : null}
      </Animated.View>
    );
  },
);

TextField.displayName = 'TextField';
