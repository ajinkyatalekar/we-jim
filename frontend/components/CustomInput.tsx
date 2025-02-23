import { View, Text, TextInput, TouchableOpacity, Image, KeyboardTypeOptions } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';

interface CustomInputProps {
  title: string;
  onChange: (text: string) => void;
  value?: string;
  placeholder?: string;
  containerStyles?: string;
  textBoxStyles?: string;
  keyboardType?: KeyboardTypeOptions;
  icon?: React.ComponentProps<typeof Feather>['name'];
  error?: string;
  hidden?: boolean;
}

const CustomInput = ({title, value, placeholder, onChange, containerStyles, textBoxStyles, keyboardType, icon, error, hidden, ...props}: CustomInputProps) => {
  const [showPassword, setshowPassword] = useState(false)

  return (
    <View className={`${containerStyles}`}>
      <Text className='ml-2 text-gray-200 text-md mb-1 font-plight'>{title}</Text>
      <View className={`rounded-lg bg-background-100 h-[55px] px-4 justify-center items-center flex-row w-full  ${textBoxStyles}`}>
        <TextInput 
            className='flex-1 text-primary font-plight'
            value={value}
            placeholder={placeholder}
            onChangeText={onChange}
            secureTextEntry={hidden && !showPassword}
            keyboardType={keyboardType}
            placeholderTextColor="gray"
        />

        {hidden && (
            <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                <Feather name={!showPassword ? 'eye' : 'eye-off'} size={18} color="#999999" className='p-1' />
            </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-red-400 text-md mt-2 ml-2">{error}</Text>
      )}
    </View>
  )
}

export default CustomInput