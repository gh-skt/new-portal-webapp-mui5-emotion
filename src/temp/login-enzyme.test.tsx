
import {Card, CardContent, TextField} from "@mui/material";
import GHButton from "../components/common/UI/GHButton";
import { shallow } from 'enzyme';
import Head from 'next/head';
import Image from 'next/image';
import Login from "../pages/Login";


xdescribe('Enzyme Login Page', () => {
  const props = {};

  it('should render Head Section', () => {
    const container = shallow(<Login {...props} />);
    const head = container.find(Head);
    expect(head.exists()).toBe(true);
  });
  it('should render Card Section', () => {
    const container = shallow(<Login {...props} />);
    const card = container.find(Card);
    expect(card.exists()).toBe(true);
  });
  it('should render Card content Section', () => {
    const container = shallow(<Login {...props} />);
    const cardContent = container.find(CardContent);
    expect(cardContent.exists()).toBe(true);
  });
  it('should render Image Section', () => {
    const container = shallow(<Login {...props} />);
    const image = container.find(Image);
    expect(image.exists()).toBe(true);
    expect(image.prop('src')).toBe(
      '/guardant-logo-with-text-564a398b2f545f7fb2a1c9e82542da7704e6d255991469e9806fb7147aa34ce6.svg'
    );
    expect(image.prop('alt')).toBe('Guardant Logo');
  });
  it('should render username input field', () => {
    const container = shallow(<Login {...props} />);
    const inputText = container.find(TextField).at(0);
    expect(inputText.exists()).toBe(true);
    expect(inputText.prop('variant')).toBe('outlined');
    expect(inputText.prop('margin')).toBe('normal');
    expect(inputText.prop('id')).toBe('username');
    expect(inputText.prop('label')).toBe('Username');
    expect(inputText.prop('onChange')).toEqual(expect.any(Function));
  });
  it('should render Password field', () => {
    const container = shallow(<Login {...props} />);
    const inputText = container.find(TextField).at(1);
    expect(inputText.exists()).toBe(true);
    expect(inputText.prop('variant')).toBe('outlined');
    expect(inputText.prop('margin')).toBe('normal');
    expect(inputText.prop('id')).toBe('password');
    expect(inputText.prop('label')).toBe('Password');
    expect(inputText.prop('type')).toBe('password');
    expect(inputText.prop('onChange')).toEqual(expect.any(Function));
  });
  it('should render Sign In Button', () => {
    const container = shallow(<Login {...props} />);
    const signInButton = container.find(GHButton);
    expect(signInButton.exists()).toBe(true);
    expect(signInButton.prop('variant')).toBe('contained');
    expect(signInButton.prop('color')).toBe('primary');
    expect(signInButton.prop('type')).toBe('submit');
  });
});
