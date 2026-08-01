import React, { useState } from 'react';
import { useUser } from '@clerk/expo';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText, ButtonSpinner } from '@/components/ui/button';
import { User, UserRound, Users, ChevronDown, UserCircle2 } from 'lucide-react-native';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from '@/components/ui/select';
import { Icon } from '@/components/ui/icon';

const GENDER_OPTIONS = [
  { id: 'male', label: 'Male', icon: User },
  { id: 'female', label: 'Female', icon: UserRound },
  { id: 'other', label: 'Other', icon: Users },
];

export default function ProfileScreen() {
  const { user } = useUser();
  const router = useRouter();

  const [fullname, setFullname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSave = async () => {
    setErrorMsg('');
    if (!fullname.trim() || !age || !gender) {
      setErrorMsg('Please fill out all fields');
      return;
    }

    setIsSaving(true);
    try {
      await user?.updateMetadata({
        unsafeMetadata: {
          fullname,
          age,
          gender,
        },
      });

      // AuthGuard in _layout will automatically detect the profile completion and redirect to /
      router.replace('/');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-neutral-50"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <VStack className="flex-1 px-6 py-12" space="xl">
          
          <Box className="items-center mb-6">
            <UserCircle2 size={120} className="text-primary-500" strokeWidth={1} />
          </Box>

          <VStack space="md" className="mb-4">
            <Heading size="2xl">Tell Us About Yourself</Heading>
            <Text size="md" className="text-typography-500">
              Help us personalize your experience. You can always update this later.
            </Text>
          </VStack>

          <VStack space="sm" className="mb-2">
            <Text className="text-typography-900 font-medium">Full Name<Text className="text-error-500">*</Text></Text>
            <Input className="bg-white">
              <InputField 
                placeholder="Enter Your Full name" 
                value={fullname}
                onChangeText={setFullname}
                editable={!isSaving}
              />
            </Input>
          </VStack>

          <VStack space="sm" className="mb-2">
            <Text className="text-typography-900 font-medium">Age</Text>
            <Select onValueChange={setAge} selectedValue={age} isDisabled={isSaving}>
              <SelectTrigger variant="outline" size="lg" className="bg-white justify-between">
                <SelectInput placeholder="Select Age" />
                <SelectIcon className="mr-3" as={ChevronDown} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {/* Provide a range of ages */}
                  {Array.from({ length: 60 }, (_, i) => i + 18).map((a) => (
                    <SelectItem key={a} label={a.toString()} value={a.toString()} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </VStack>

          <VStack space="sm" className="mb-4">
            <Text className="text-typography-900 font-medium">Gender</Text>
            <HStack space="md" className="justify-between">
              {GENDER_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  disabled={isSaving}
                  onPress={() => setGender(opt.id)}
                  style={{ flex: 1 }}
                >
                  <Box 
                    className={`items-center py-4 rounded-xl border bg-white ${
                      gender === opt.id ? 'border-primary-500 bg-primary-50' : 'border-outline-200'
                    }`}
                  >
                    <Icon as={opt.icon} className={`mb-2 ${gender === opt.id ? 'text-primary-500' : 'text-typography-600'}`} size="xl" />
                    <Text className={gender === opt.id ? 'text-primary-600 font-medium' : 'text-typography-600'}>
                      {opt.label}
                    </Text>
                  </Box>
                </TouchableOpacity>
              ))}
            </HStack>
          </VStack>

          {errorMsg ? <Text className="text-error-500 text-sm mt-1 mb-2">{errorMsg}</Text> : null}

          <Button 
            size="lg" 
            className="rounded-full mt-auto mb-4 bg-primary-500" 
            onPress={handleSave}
            disabled={isSaving || !fullname || !age || !gender}
          >
            {isSaving ? <ButtonSpinner color="white" /> : <ButtonText>Finish Setup</ButtonText>}
          </Button>

        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
