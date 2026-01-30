import React from 'react';
import { View, Text, DimensionValue } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';

interface PasswordStrengthProps {
  strength: 'weak' | 'medium' | 'strong';
  checks: {
    minLength: boolean;
    hasLetter: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  };
  show: boolean;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  strength,
  checks,
  show,
}) => {
  // Hide if not showing or if all 4 requirements are met
  const allRequirementsMet = checks.minLength && checks.hasLetter && checks.hasNumber && checks.hasSpecial;

  // Don't render anything if password field is empty or requirements are met
  if (!show || allRequirementsMet) return null;

  const strengthColors = {
    weak: colors.error,
    medium: colors.warning,
    strong: colors.success,
  };

  const strengthLabels = {
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
  };

  const strengthWidth: Record<'weak' | 'medium' | 'strong', DimensionValue> = {
    weak: '33%',
    medium: '66%',
    strong: '100%',
  };

  const requirements = [
    { key: 'minLength', label: 'At least 8 characters', passed: checks.minLength },
    { key: 'hasLetter', label: 'Contains a letter', passed: checks.hasLetter },
    { key: 'hasNumber', label: 'Contains a number', passed: checks.hasNumber },
    { key: 'hasSpecial', label: 'Contains a special character', passed: checks.hasSpecial },
  ];

  return (
    <View className="mt-2 mb-2">
      {/* Strength bar */}
      <View className="flex-row items-center mb-2">
        <View
          className="flex-1 h-2 rounded-full mr-2"
          style={{ backgroundColor: colors.brown[100] }}
        >
          <View
            className="h-2 rounded-full"
            style={{
              width: strengthWidth[strength],
              backgroundColor: strengthColors[strength],
            }}
          />
        </View>
        <Text
          className="text-sm font-medium"
          style={{ color: strengthColors[strength], minWidth: 50 }}
        >
          {strengthLabels[strength]}
        </Text>
      </View>

      {/* Requirements checklist */}
      <View className="pl-1">
        {requirements.map((req) => (
          <View key={req.key} className="flex-row items-center mb-1">
            <Ionicons
              name={req.passed ? 'checkmark-circle' : 'ellipse-outline'}
              size={16}
              color={req.passed ? colors.success : colors.brown[300]}
            />
            <Text
              className="text-xs ml-2"
              style={{ color: req.passed ? colors.success : colors.brown[400] }}
            >
              {req.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
