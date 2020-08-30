import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';

import MessageInput from './MessageInput';
import React from 'react';
import { createMemoryHistory } from 'history';

describe('MessageInput;', () => {
  afterEach(cleanup);

  it('triggers callback on send button click', async () => {
    const onSendMessage = jest.fn(() => {});

    {
      const { container, getByTestId } = render(
        <MessageInput onSendMessage={onSendMessage} />
      );
      const messageInput = getByTestId('message-input');
      const sendButton = getByTestId('send-button');

      fireEvent.change(messageInput, { target: { value: 'foo' } });

      await waitFor(() => messageInput);

      fireEvent.click(sendButton);

      await waitFor(() => expect(onSendMessage.mock.calls.length).toBe(1));
    }
  });

  it('triggers callback on Enter press', async () => {
    const onSendMessage = jest.fn(() => {});

    {
      const { container, getByTestId } = render(
        <MessageInput onSendMessage={onSendMessage} />
      );
      const messageInput = getByTestId('message-input');

      fireEvent.change(messageInput, { target: { value: 'foo' } });

      await waitFor(() => messageInput);

      fireEvent.keyPress(messageInput, {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });

      await waitFor(() => expect(onSendMessage.mock.calls.length).toBe(1));
    }
  });
});
