import styled from "styled-components";

const Dot = styled.button.attrs(({ type = "button" }) => ({ type }))`
  box-sizing: border-box;
  padding: 0;
  transition: all 250ms ease;
  border: none;
  margin: 5px;
  background-color: ${({ active }) =>
    active ? "rgba(103,58,183,.5)" : "transparent"};
  font-size: 1.3em;
  content: "";
  height: 10px;
  width: 10px;
  box-shadow: ${({ active }) => (active ? activeBoxShadow : boxShadow)};
  border-radius: 50%;
  outline: none;
  &:hover,
  &:focus {
    cursor: pointer;
    box-shadow: ${({ active }) =>
      active ? activeBoxShadow : hoveredBoxShadow};
  }
`;