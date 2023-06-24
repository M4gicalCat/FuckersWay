type Cache = {
  array: number[];
  pointer: number;
  readingPointer: number;
  brackets: { opening: number; closing: number }[];
  interval?: NodeJS.Timer;
};

interface Action {
  type: string;
  value: any;
}

interface IncrementAction extends Action {
  type: 'increment';
  value: number;
}

interface DecrementAction extends Action {
  type: 'decrement';
  value: number;
}

const firstParse = (cache: Cache, bf: string[]) => {
  let opened = 0;
  for (let i = 0; i < bf.length; i++) {
    if (bf[i] === '[') {
      cache.brackets.push({ opening: i, closing: -1 });
      opened++;
    } else if (bf[i] === ']') {
      let found = false;
      for (
        let bracketIndex = cache.brackets.length - 1;
        bracketIndex >= 0;
        bracketIndex--
      ) {
        if (cache.brackets[bracketIndex].closing === -1) {
          cache.brackets[bracketIndex].closing = i;
          found = true;
          opened--;
          break;
        }
      }
      if (!found)
        throw new Error(`Error: Unmatched closing bracket at index ${i}.`);
    }
  }
  if (opened > 0) {
    const all = cache.brackets.filter(b => b.closing === -1);
    throw new Error(
      `Unmatched opening bracket(s) at position(s): ${all
        .map(b => b.opening)
        .join(', ')}`,
    );
  }
};

const nextAction = (bf: string[], cache: Cache): Action | void => {
  do {
    cache.readingPointer++;
  } while (
    ![undefined, '+', '-', '>', '<', '.', ']'].includes(
      bf[cache.readingPointer],
    )
  );
  if (cache.readingPointer >= bf.length) {
    clearInterval(cache.interval);
    return { type: 'end', value: null };
  }
  switch (bf[cache.readingPointer]) {
    case '+':
      cache.array[cache.pointer] = cache.array[cache.pointer] ?? 0;
      cache.array[cache.pointer]++;
      return { type: 'increment', value: cache.pointer } as IncrementAction;
    case '-':
      cache.array[cache.pointer] = cache.array[cache.pointer] ?? 0;
      cache.array[cache.pointer]--;
      return { type: 'decrement', value: cache.pointer } as DecrementAction;
    case '>':
      cache.array[cache.pointer + 1] = cache.array[cache.pointer + 1] ?? 0;
      cache.pointer++;
      return nextAction(bf, cache);
    case '<':
      cache.array[cache.pointer - 1] = cache.array[cache.pointer - 1] ?? 0;
      cache.pointer--;
      return nextAction(bf, cache);
    case '.':
      return { type: 'print', value: cache.array[cache.pointer] };
    case ']':
      if (cache.array[cache.pointer] !== 0) {
        // Go back to the opening bracket
        cache.readingPointer =
          cache.brackets.find(b => b.closing === cache.readingPointer)!
            .opening - 1;
      }
      return nextAction(bf, cache);
  }
};

/**
 * Parses and executes the given brainfuck program and emits events at every move
 * @param brainfuck {string} the brainfuck program to parse and execute
 * @param emit The function used to emit an event
 */
export const parse = (
  brainfuck: string,
  emit: (action: { type: string; value: any }, stop: () => void) => void,
): Promise<void> => {
  const cache: Cache = {
    array: [0],
    pointer: 0,
    readingPointer: -1,
    brackets: [],
  };
  const bf = brainfuck.split('');
  firstParse(cache, bf);
  console.log(JSON.parse(JSON.stringify(cache)));
  return new Promise(r => {
    cache.interval = setInterval(() => {
      const action = nextAction(bf, cache);
      if (action?.type === 'end') r();
      if (action) emit(action, () => clearInterval(cache.interval));
    }, 500);
  });
};
