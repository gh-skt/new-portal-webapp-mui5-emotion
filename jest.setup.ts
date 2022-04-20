import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { setConfig } from 'next/config'
// @ts-ignore
import { publicRuntimeConfig } from './next.config';

setConfig({ publicRuntimeConfig });