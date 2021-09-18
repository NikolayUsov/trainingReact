import React, { useState } from 'react';
import styles from './app.module.scss';
import { ButtonBase, Modal, TextField, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Paper } from '@mui/material';
import { Container } from '@mui/material';
import { Box, height } from '@mui/system';
import { makeStyles } from '@material-ui/styles';
import Timer from '../timer/timer';

const phoneRegxp = /^((\+7|7|8)+([0-9]){10})$/
const smsRegxp = /^([0-9]){4}$/

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
  },
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    padding: '15px 20px',
    transform: 'translate(-50%, -50%)',
    opacity: 1,
    backgroundColor: 'white',
    width: 800,
    height: 400,
  },
  buttonClose: {
    color: 'red',
    position: 'absolute',
    top: 0,
    right: 0,
  }
});
const initialInput = {
  value: '',
  rule: phoneRegxp,
  isValid: true,
  touched: false,
}

const smsInitialValue = {
  value: '',
  rule: smsRegxp,
  isValid: false,
}
function App() {
  const [open, setOpen] = useState(false);
  const [input, setValue] = useState(initialInput);
  const [isSendSms, setSms] = useState(false);
  const [smsInput, setSmsInput] = useState(smsInitialValue);
  const [isDestroyTimer, setDestroyTimer] = useState(false);
  
  
  const onInputChange = (evt: any) => {
    const {value} = evt.target;
    setValue((prev) => {
      const isValid = prev.rule.test(value);
      return{...prev, isValid, touched: true, value}
    })
  }

  const onSmsInputChange = (evt:any) => {
    const {value} =evt.target;

    setSmsInput((prev) => {
      const isValid = prev.rule.test(value);
      if(isValid){
        setDestroyTimer(true);
      }
      return{...prev, isValid, touched: true, value}
    });
  }

  const handleSms = (smsValue: boolean) => setSms(smsValue);
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false);
  const classes = useStyles()
  return (
    <Container>
      <Button variant='outlined' onClick={handleOpenModal}>
        <Typography variant='subtitle1'>Начать регистрацию</Typography>
      </Button>
      <Modal open={open}>
        <Box className={classes.modalContent} component="form">
          <Container>
            <Typography>Show modal</Typography>
            {isSendSms ? (
              <TextField
              label="Введите код из sms"
              error={!input.isValid}
              value ={smsInput.value}
              onChange={(evt) => {onSmsInputChange(evt)}}
            />
            )
          : (<TextField
            label="Введите номер телефона"
            error={!input.isValid}
            value ={input.value}
            onChange={(evt) => {onInputChange(evt)}}
            helperText={!input.isValid && 'Неправильный формат номера'}
          />)
          }

            {(input.value && input.isValid) && (
              <>
                {smsInput.isValid ? <Button>Зарегистрироваться</Button> : <Button onClick={() =>{handleSms(true)}} className={classes.buttonClose}>Отправить SMS</Button>}
                {isSendSms && <Timer start={10} handleRetry={handleSms} stop={isDestroyTimer}/>}
              </>    
            )}
            <Button onClick={handleCloseModal} className={classes.buttonClose}>Закрыть</Button>
          </Container>
        </Box>
      </Modal>
    </Container>
  );
}
export default App;
