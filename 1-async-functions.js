const promiseTimeout = (val, delay = 1000) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(val);
    }, delay);

  });

const main = async () => {
  console.log('Starting...');

  const one = await promiseTimeout(1);

  console.log(one);

  const two = await promiseTimeout(one + one);

  console.log(two);

  console.log('Done!');
};

const interuption = async () => {
  const result = await promiseTimeout('Interupting!', 1250);
  console.log(result);
};

main();
interuption();

