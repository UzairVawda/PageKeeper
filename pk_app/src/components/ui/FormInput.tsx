import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme";

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  isValid?: boolean;
  isPassword?: boolean;
  showValidation?: boolean;
  showValidationColors?: boolean;
  onFocusChange?: (focused: boolean) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  isValid,
  isPassword = false,
  showValidation = false,
  showValidationColors = true,
  onFocusChange,
  value,
  testID,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasBeenTouched, setHasBeenTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const hasValue = value && value.length > 0;
  const showStatus = showValidation && hasValue;

  // Determine border color
  const getBorderColor = () => {
    if (showValidationColors) {
      // Valid state takes priority - green
      if (isValid && hasValue) return colors.success;
      // Has been touched and has value but invalid - red
      if (hasBeenTouched && hasValue && !isValid) return colors.error;
    }
    // Currently focused - brown accent
    if (isFocused) return colors.brown[500];
    // Default - light brown
    return colors.brown[200];
  };

  const handleFocus = () => {
    setIsFocused(true);
    setHasBeenTouched(true);
    onFocusChange?.(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onFocusChange?.(false);
  };

  return (
    <View className="mb-3">
      <Text
        className="mb-1 text-sm font-medium"
        style={{ color: colors.brown[700] }}
      >
        {label}
      </Text>

      <View className="flex-row items-center">
        <TextInput
          className="flex-1 text-base rounded-xl"
          style={{
            backgroundColor: colors.white,
            borderWidth: 2,
            borderColor: getBorderColor(),
            color: colors.brown[800],
            paddingLeft: 14,
            paddingRight: showStatus || isPassword ? 50 : 14,
            height: 46,
            lineHeight: 20,
            textAlignVertical: "center",
          }}
          placeholderTextColor={colors.brown[300]}
          secureTextEntry={isPassword && !showPassword}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          testID={testID}
          accessibilityLabel={label}
          {...props}
        />

        {/* Password visibility toggle */}
        {isPassword && hasValue && (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 14,
              top: 0,
              bottom: 0,
              justifyContent: "center",
            }}
            onPress={() => setShowPassword(!showPassword)}
            testID={testID ? `${testID}-toggle` : undefined}
            accessibilityLabel={showPassword ? "Hide password" : "Show password"}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color={colors.brown[400]}
            />
          </TouchableOpacity>
        )}

        {/* Validation status icon */}
        {!isPassword && showStatus && (
          <View
            style={{
              position: "absolute",
              right: 14,
              top: 0,
              bottom: 0,
              justifyContent: "center",
            }}
            testID={testID ? `${testID}-${isValid ? 'valid' : 'invalid'}-icon` : undefined}
          >
            <Ionicons
              name={isValid ? "checkmark-circle" : "alert-circle"}
              size={22}
              color={isValid ? colors.success : colors.error}
            />
          </View>
        )}
      </View>

      {/* Error message */}
      {error && (
        <Text className="mt-1 text-sm" style={{ color: colors.error }}>
          {error}
        </Text>
      )}
    </View>
  );
};
