const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, '');

  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;

  if (phoneNumberLength < 7) {
    return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
  }

  if (phoneNumberLength < 11) {
    return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6)}`;
  }
  return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(
    8,
    10
  )} ${phoneNumber.slice(10, 12)}`;
};

export default formatPhoneNumber;
