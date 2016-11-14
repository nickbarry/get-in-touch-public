// Client-side validation

export function contactName(name) {
  if (!name) {
    return 'Don\'t forget your contact\'s name!';
  }
  if (name && name.length > 1000) {
    return 'Name must be fewer than 1000 characters';
  }
  return undefined;
}
export function contactNameWarning(name) {
  if (name && name.length > 120) {
    return 'Just double checking...is their name really this long? :)';
  }
  return undefined;
}

export function contactEmail(email) {
  if (email && email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi) === null) {
    return 'Email must be in the format of an email address';
  }
  if (email && email.length > 200) {
    return 'Email must be fewer than 200 characters';
  }
  return undefined;
}

export function contactPhone(phone) {
  if (!phone) {
    return undefined;
  }
  if (phone.match(/[^0-9() \-]/)) {
    // If they're seeing this error, we've messed up, or they've tampered with the code, because
    // the form's normalization should prevent anything other than these characters
    // from appearing.
    return 'Please only type numbers, parentheses, spaces, or hyphens';
  }
  return undefined;
}

export function contactContactFrequency(contactFrequency) {
  if (contactFrequency && contactFrequency.match(/[^0-9]/)) {
    return 'Only numbers are allowed';
  }
  return undefined;
}

export function contactContactFrequencyWarning(contactFrequency) {
  if (contactFrequency && +contactFrequency > 730) {
    return 'Are you sure you want the contact frequency to be more than 2 years?';
  }
  return undefined;
}

export const normalizePhone = (value, previousValue) => {
  const onlyNums = value && value.replace(/[^\d]/g, '');
  if (!value) {
    return value;
  }
  const typingForward = !previousValue || (value.length > previousValue.length);
  if (value && !onlyNums) {
    return typingForward ? '(' : '';
  }
  const format = '(___) ___-____';
  const displayedValue = [];
  let valuePlace = 0;
  for (let i = 0; i < format.length; i++) { // eslint-disable-line no-plusplus
    if (format[i] === '_') {
      displayedValue[i] = onlyNums[valuePlace];
      valuePlace += 1;
    } else {
      displayedValue[i] = format[i];
    }
    if (onlyNums[valuePlace] === undefined) { // If there are no more user-inputted numbers to format
      if (typingForward) {
        const whitespace = format.slice(i + 1).replace(/^([^_]*).*/, '$1');
        displayedValue[i + 1] = whitespace;
      }
      break;
    }
  }
  return displayedValue.join('');
};

// export const parsePhone = (phone) => {
//  if (!phone) {
//    return phone;
//  }
//  const onlyNums = phone.replace(/[^\d]/g, '');
//  if (!onlyNums) {
//    return undefined;
//  }
//  if (onlyNums.length < 10) {
//    return onlyNums;
//  }
// };
//
// export const parseOnSubmit = (values) => {
//  const parsedValues = Object.assign({}, values);
//  const parsers = {
//    phone: parsePhone,
//  };
//
//  for (const name of Object.keys(parsers)) {
//    if (values[name]) {
//      parsedValues[name] = parsers[name](values[name]);
//    }
//  }
//
//  return parsedValues;
// };

export const contactValidation = {
  name: contactName,
  email: contactEmail,
  phone: contactPhone,
  contactFrequency: contactContactFrequency,
};

export const contactWarning = {
  name: contactNameWarning,
  contactFrequency: contactContactFrequencyWarning,
};
