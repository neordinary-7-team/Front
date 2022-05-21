/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import { PanResponder } from 'react-native';

import type {
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import type { PanResponderCallbacks, PanResponderInstance } from 'react-native';

type Event = GestureResponderEvent;
type State = PanResponderGestureState;

// true를 반환하는 defaultCallback 구현
const defaultCallback = {
  onStartShouldSetPanResponder: (e: Event, s: State) => true,
  onMoveShouldSetPanResponder: (e: Event, s: State) => true,
};

export const usePanResponder = (
  callbacks: PanResponderCallbacks,
  deps: any[] = []
): PanResponderInstance => {
  const panResponder = useMemo<PanResponderInstance>(
    () => PanResponder.create({ ...defaultCallback, ...callbacks }), // callback 존재시 재구현 하도록
    deps
  );
  return panResponder;
};
