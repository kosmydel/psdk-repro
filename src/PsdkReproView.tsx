import { requireNativeView } from 'expo';
import * as React from 'react';

import { PsdkReproViewProps } from './PsdkRepro.types';

const NativeView: React.ComponentType<PsdkReproViewProps> =
  requireNativeView('PsdkRepro');

export default function PsdkReproView(props: PsdkReproViewProps) {
  return <NativeView {...props} />;
}
