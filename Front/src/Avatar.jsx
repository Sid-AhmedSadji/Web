import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';

function App({login}) {
  const avatar = useMemo(() => {
    return createAvatar(adventurer, {
      size: 128,
    }).toDataUriSync();
  }, []);

  return <img src={avatar} alt="Avatar" />;
}

export default App;