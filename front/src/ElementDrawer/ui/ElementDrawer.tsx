import { ChangeEventHandler, FC, KeyboardEventHandler, useState } from 'react';

import {
  Alert,
  Box,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import { IElDrawer, InputType } from '../model';

import s from './ElementDrawer.module.css';

export const ElementDrawer: FC = () => {
  const [form, setForm] = useState({
    isErr: false,
    value: ''
  });
  const [elDrawers, setElDrawers] = useState<IElDrawer[]>([]);

  const parseEls = () => {
    const strs = form.value.split(';').map(l => l.trim());

    if (strs.length !== 5) {
      setForm(prev => ({
        ...prev,
        isErr: true
      }));

      return;
    }

    const [rowNumber, columnNumber, inputLabel, inputType, inputOptions] = strs;

    const rowInt = parseInt(rowNumber);
    const isRowValid = Number.isInteger(rowInt) && rowInt > 0;

    const colInt = parseInt(columnNumber);
    const isColValid = Number.isInteger(colInt) && colInt > 0;

    const type = inputType.toLowerCase() as InputType;
    const isTypeValid = Object.values(InputType).includes(type);

    if (!isRowValid || !isColValid || !isTypeValid) {
      setForm(prev => ({
        ...prev,
        isErr: true
      }));

      return;
    }

    setElDrawers(prev => [
      ...prev.filter(
        prevEl => prevEl.row !== rowInt || prevEl.column !== colInt
      ),
      {
        column: colInt,
        id: Date.now(),
        label: inputLabel,
        options:
          type === InputType.Select
            ? inputOptions.split(',').map(o => o.trim())
            : [inputOptions],
        row: rowInt,
        type
      }
    ]);
    setForm(prev => ({
      ...prev,
      value: ''
    }));
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    setForm(prev => ({
      ...prev,
      value: e.target.value
    }));

    if (!form.isErr) {
      return;
    }

    setForm(prev => ({
      ...prev,
      isErr: false
    }));
  };

  const handleKeyDown: KeyboardEventHandler = e => {
    if (e.key !== 'Enter') {
      return;
    }

    e.preventDefault();
    parseEls();
  };

  const maxRow = Math.max(...elDrawers.map(e => e.row), 1);
  const maxCol = Math.max(...elDrawers.map(e => e.column), 1);

  return (
    <Box
      className={s.elementDrawer}
      sx={{
        p: 3
      }}
    >
      <Typography variant="h3" gutterBottom>
        Create an Element Drawer
      </Typography>

      <Alert
        severity="success"
        sx={{
          mb: 3
        }}
      >
        <Typography variant="h6" gutterBottom>
          Enter strings with the following format:
        </Typography>

        <Typography
          component="p"
          sx={{
            fontFamily: 'monospace',
            mb: 2
          }}
          variant="caption"
        >
          rowNumber;columnNumber;inputLabel;inputType;inputOptions
        </Typography>

        <Typography variant="body1" gutterBottom>
          Example:
        </Typography>

        <Stack
          spacing={1}
          sx={{
            mb: 2
          }}
        >
          <Typography
            component="p"
            sx={{
              fontFamily: 'monospace'
            }}
            variant="caption"
          >
            1;1;gender;SELECT;Male,Female
          </Typography>
          <Typography
            component="p"
            sx={{
              fontFamily: 'monospace'
            }}
            variant="caption"
          >
            2;1;firstName;TEXT_INPUT;Enter your first name
          </Typography>
        </Stack>

        <Box
          component="ul"
          sx={{
            m: 0,
            pl: 2
          }}
        >
          <Typography component="li" variant="caption">
            rowNumber - Row position of the element
          </Typography>
          <Typography component="li" variant="caption">
            columnNumber - Column position of the element
          </Typography>
          <Typography component="li" variant="caption">
            inputLabel - Label text of the input element
          </Typography>
          <Typography component="li" variant="caption">
            inputType - Input type (SELECT or TEXT_INPUT)
          </Typography>
          <Typography component="li" variant="caption">
            inputOptions - For SELECT: comma-separated options. For TEXT_INPUT:
            input placeholder text
          </Typography>
        </Box>
      </Alert>

      <TextField
        error={form.isErr}
        label="Element Drawer"
        placeholder="1;2;First Name;TEXT_INPUT;Enter your first name"
        sx={{
          mt: 2
        }}
        value={form.value}
        fullWidth
        multiline
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {!!elDrawers.length && (
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: `repeat(${maxCol}, 1fr)`,
            gridTemplateRows: `repeat(${maxRow}, auto)`,
            mt: 2
          }}
        >
          {elDrawers.map(el => {
            let textField;

            if (el.type === InputType.TextInput) {
              textField = (
                <TextField
                  label={el.label}
                  placeholder={el.options[0]}
                  fullWidth
                />
              );
            }
            if (el.type === InputType.Select) {
              textField = (
                <TextField label={el.label} fullWidth select>
                  {el.options.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }

            return (
              <Box
                key={el.id}
                sx={{
                  gridColumn: el.column,
                  gridRow: el.row
                }}
              >
                {textField}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
