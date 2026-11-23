(() => {
  const calculator = document.getElementById('duration-calculator');
  const [power, capacity, usable, efficiency, target] = calculator.querySelectorAll('input');
  const inputs = [power, capacity, usable, efficiency, target];
  const energy = document.getElementById('ess-energy');
  const duration = document.getElementById('ess-duration');
  const required = document.getElementById('ess-required-capacity');
  const error = document.getElementById('ess-input-error');
  const format = new Intl.NumberFormat(document.documentElement.lang, {
    maximumSignificantDigits: 3
  });

  function update() {
    const usableFraction = usable.valueAsNumber / 100 * (efficiency.valueAsNumber / 100);
    const deliveredEnergy = capacity.valueAsNumber * usableFraction;
    const dischargeTime = deliveredEnergy / power.valueAsNumber;
    const requiredCapacity = power.valueAsNumber * target.valueAsNumber / usableFraction;
    const valid = inputs.every(input => input.validity.valid && input.valueAsNumber > 0)
      && [deliveredEnergy, dischargeTime, requiredCapacity].every(value => Number.isFinite(value) && value > 0);

    error.hidden = valid;
    energy.textContent = valid ? format.format(deliveredEnergy) + ' MWh' : '—';
    duration.textContent = valid ? format.format(dischargeTime) + ' h' : '—';
    required.textContent = valid ? format.format(requiredCapacity) + ' MWh' : '—';
  }

  calculator.addEventListener('input', update);
  update();
})();
