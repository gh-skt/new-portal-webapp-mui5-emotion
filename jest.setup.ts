import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme'
import { setConfig } from 'next/config'

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
// @ts-ignore
import { publicRuntimeConfig } from './next.config'

setConfig({ publicRuntimeConfig })

configure({ adapter: new Adapter() })