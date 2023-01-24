import PropTypes from 'prop-types';
import { ButtonStyled } from './Button.styled';

export const Button = ({ onButtonHandleClick }) => {
  return (
    <ButtonStyled onClick={onButtonHandleClick} type="button">
      Load more
    </ButtonStyled>
  );
};
Button.propTypes = {
  onButtonHandleClick: PropTypes.func.isRequired,
};
