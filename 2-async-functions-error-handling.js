const promiseTimeout = (val, delay = 1000) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(val);
    }, delay);
  });

const handleError = err => {
  console.error(err);
};

const promiseChain = x =>
  promiseTimeout(x)
    .then(x => [null, x])
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
  const result = await promiseTimeout('Interupting!', 1250);
  console.log(result);
};

main();
interuption();
