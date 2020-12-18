import React from 'react';
import { connect } from 'react-redux';
import { generate } from 'shortid';
import styled from 'styled-components';

// import { animRotateAfter, animRotateBefore } from '../helpers/animations'
import { AppStore } from '../store/store';
import localStore from '../helpers/localStore';
import { createTodo, changeValuesFormTodo, changeOpennessFormTodo } from '../store/actions';
import { ChangeOpennessFormTodo, ChangeValuesFormTodo, CreateTodo, ITodo } from '../interfaces/interfaces';

interface FormTodoProps {
  value: string, 
  isOpenFormTodo: boolean,
  todos: ITodo[],
  changeValuesFormTodo: (value: string) => ChangeValuesFormTodo, 
  changeOpennessFormTodo: (isOpenFormTodo: boolean) => ChangeOpennessFormTodo, 
  createTodo: (todo: ITodo) => CreateTodo;
}

const FormTodo: React.FC<FormTodoProps> = ({ 
  value, 
  isOpenFormTodo,
  todos,
  changeValuesFormTodo, 
  changeOpennessFormTodo, 
  createTodo,
}) => {
  const title = value;
  
  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!title.trim()) return;
    const newTodo = { title, isComplete: false, key: generate() };

    createTodo(newTodo);
    changeValuesFormTodo('');
    changeOpennessFormTodo(!isOpenFormTodo);

    localStore.set('myTodos', [ ...todos, newTodo]);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    changeValuesFormTodo(event.target.value);
  };

  const changeOpennessFormHandler = () => {
    changeOpennessFormTodo(!isOpenFormTodo);
  };

  return (
    <>
      <FormTodoStyled
        onSubmit={submitHandler}
        isOpen={isOpenFormTodo}
      >
        <h2>Create new todo</h2>
        <input 
          placeholder="Title"
          type="text" 
          name="title"
          value={title}
          onChange={changeHandler}
        />
        <button type="submit">submit</button>
      </FormTodoStyled>
      <BtnOpenForm onClick={changeOpennessFormHandler} >
        <span className="visually-hidden">Button for open form</span>
      </BtnOpenForm>     
    </>
  );
};

const mapStateToProps = ( state: AppStore ) => ({
  value: state.UI.UI.formTodo.value,
  isOpenFormTodo: state.UI.UI.formTodo.isOpenFormTodo,
  todos: state.todos.todos,
});
const mapDispatchToProps = {
  changeValuesFormTodo,
  changeOpennessFormTodo,
  createTodo
};

export default connect( mapStateToProps, mapDispatchToProps )(FormTodo);



const BtnOpenForm = styled.button`
  position: fixed;
  z-index: 6;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;  
  background: #61c7b9;
  cursor: pointer;
  &:active {
    background: #49a094;
  }
  &::before, 
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    border-radius: 5px;
    height: 25px;
    background-color: #000;
    transition: all 0.3s;
  }
`;

const FormTodoStyled = styled.form<{ isOpen: boolean }>`
  width: 100%;
  bottom: 60px;
  left: 0px;
  position: fixed;
  height: ${({isOpen}) => isOpen ? '200px': '0px'};
  padding: ${({isOpen}) => isOpen ? '20px 20px': '0px 20px'};
  overflow: hidden;
  background-color: #61c7b9;
  transition: all 0.3s;
  font-size: 20px;
  font-family: serif;
  &+${BtnOpenForm} {
    border: 1px solid ${({isOpen}) => isOpen ? '#49a094'  : '#61c7b9'};
    bottom: 39px;
    border-top: none;
    border-bottom-width: 2px;
    border-radius: 50%;
    &::before {
      transform: ${({isOpen}) => isOpen ? 'translate( -50%, -50% ) rotate(-45deg)' : 'translate( -50%, -50% )'};
    }
    &::after {
      transform: ${({isOpen}) => isOpen ? 'translate( -50%, -50% ) rotate(45deg)' : 'translate( -50%, -50% ) rotate(90deg)'};
    }
  }
  & input,
  & button {
    border-radius: 3px;
    width: calc(100% - 10px);
    padding: 10px;
  }
  & input {
    height: 50px;
    margin-bottom: 15px;
  }  
  & h2 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
  }  
`;
