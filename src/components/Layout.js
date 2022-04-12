import {Container} from '@mui/material';
import Header from './header';

const Layout = (props) => {
  const { children, maxWidth,style } = props;
  return (
    <div>
      <Header />
      <Container style={style?style:null} maxWidth={maxWidth || 'lg'}>{children}</Container>
    </div>
  );
};

export default Layout;
