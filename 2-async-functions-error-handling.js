const promiseTimeout = (val, delay) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(val);
    }, delay);
  });

const handleError = err => {
  console.error('An error occurred...');
  console.error(new Error(err));
};

const promiseChain = (x, delay = 1000) =>
  promiseTimeout(x, delay)
    .then(y => [null, y])
    .catch(err => [err, null]);

const main = async () => {
  console.log('Starting...');

  const [err1, one] = await promiseChain(1);
  if (err1) {
    handleError(err1);
    return;
  }

  console.log(one);

  const [err2, two] = await promiseChain(one + one);
  if (err2) {
    handleError(err2);
    return;
  }

  console.log(two);

  console.log('Done!');
};

const interuption = async () => {
  const [err, result] = await promiseChain('Interupting!', 1250);
  if (err) {
    handleError(err);
    return;
  }

  console.log(result);
};

main();
interuption();
