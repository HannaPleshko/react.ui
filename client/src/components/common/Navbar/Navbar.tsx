import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import styles from './Navbar.module.css';
import { LINKS } from '../../../utils/constants/resumeConstants';

function Navbar() {
  return (
    <AppBar sx={{ backgroundColor: '#2a64ad', position: 'sticky', top: 0 }}>
      <Container maxWidth="lg" sx={{ mb: 3, mt: 3, ml: 0 }}>
        <>
          {LINKS.map((item) => {
            return (
              <Link key={item.name} to={item.path} className={styles.link}>
                {item.name}
              </Link>
            );
          })}
        </>
      </Container>
    </AppBar>
  );
}
export default Navbar;
