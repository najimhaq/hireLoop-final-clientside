'use client';

import { useState, useEffect } from 'react';

export default function useInView(threshold) {
  var t = threshold === undefined ? 0.1 : threshold;
  var [inView, setInView] = useState(false);

  useEffect(function () {
    var timer = setTimeout(function () {
      setInView(true);
    }, 50);
    return function () {
      clearTimeout(timer);
    };
  }, []);

  return inView;
}
