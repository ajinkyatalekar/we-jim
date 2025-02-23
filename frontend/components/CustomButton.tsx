import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  inverted?: boolean;
  disabled?: boolean;
}

const CustomButton = ({title, handlePress, containerStyles, textStyles, inverted, disabled}: CustomButtonProps) => {

  return (
    <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        className={`rounded-lg min-h-[52px] justify-center w-full items-center ${inverted ? 'bg-background-100' : 'bg-secondary-100'} ${disabled ? 'opacity-50' : ''} ${containerStyles}`}
        disabled={disabled}
    >
        <Text className={`font-psemibold text-lg ${inverted ? 'text-primary' : 'text-background'} ${textStyles}`}>
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton