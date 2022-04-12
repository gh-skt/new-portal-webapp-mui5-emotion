import React, { useState } from 'react';
import {MenuItem,Select, Box} from '@mui/material';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LaguaugeWrapper = styled(Box)(({ theme }) => {
return {
  "& .languageSelect": {
    minWidth: 80,
    textAlign: 'left',
    color: '#8B939C',
  },
  "& .menuItemLink": {
    color: '#8B939C',
  },
}
});
const LanguageSelect = () => {
  const router = useRouter();
  const [language, setLanguage] = useState(router.locale);
  const onLocationChange = (event) => {
    const locale = event.target.value;
    setLanguage(locale);
  };
  const languages = {
    'en-US': 'English',
    fr: 'French',
    // de: 'German',
    es:'Spanish'
  };
  return (
    <LaguaugeWrapper>
    <Select
      labelId="language"
      id="language-select"
      value={language}
      className="languageSelect"
      onChange={(event) => onLocationChange(event)}
    >
      {router.locales.map((locale) => (
        <MenuItem value={locale} key={locale}>
          <Link href={router.asPath} locale={locale}>
            <a className="menuItemLink">{languages[locale]}</a>
          </Link>
        </MenuItem>
      ))}
    </Select>
    </LaguaugeWrapper>
  );
};
export default LanguageSelect;
