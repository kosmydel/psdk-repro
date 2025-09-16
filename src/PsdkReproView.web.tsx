import * as React from 'react';

import { PsdkReproViewProps } from './PsdkRepro.types';

export default function PsdkReproView(props: PsdkReproViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
