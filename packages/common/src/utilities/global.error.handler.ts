import { stringifyPlusPlus } from './string';

export default function invokeGlobalErrorHandler(error: any) {
  console.error('Global error handler:');
  console.error(error);

  const loadingElement = document.getElementById('loading')!;
  const rootElement = document.getElementById('root');

  loadingElement.style.visibility = 'initial';

  const subtitleElement = document.querySelectorAll('#loading h2')[0] as HTMLElement;

  const fromOldErrorIfAny = document.querySelectorAll('#loading .error');
  fromOldErrorIfAny.forEach(item => item.parentNode!.removeChild(item));

  subtitleElement.innerHTML = 'An unexpected error has occurred.';

  const clickForMoreInfoElement = document.createElement('a');
  clickForMoreInfoElement.href = '#';
  clickForMoreInfoElement.className = 'ms-font-m error';
  clickForMoreInfoElement.textContent = 'Click for more info';
  clickForMoreInfoElement.addEventListener('click', () => {
    const errorMessageElement = document.createElement('pre');
    errorMessageElement.textContent = stringifyPlusPlus(error);
    loadingElement.insertBefore(errorMessageElement, clickForMoreInfoElement);
    clickForMoreInfoElement!.parentNode!.removeChild(clickForMoreInfoElement);
  });
  loadingElement.insertBefore(clickForMoreInfoElement, null);

  const closeElement = document.createElement('a');
  closeElement.href = '#';
  closeElement.className = 'ms-font-m error';
  closeElement.textContent = 'Close';
  closeElement.addEventListener('click', () => {
    loadingElement.style.visibility = 'hidden';
    rootElement!.style.display = 'initial';
  });
  loadingElement.insertBefore(closeElement, null);

  // If this is (somehow) the second time that the event handler is ignored, do some cleanup
  const previousErrorMessageElement: HTMLElement = document.querySelectorAll(
    '#loading pre',
  )[0] as HTMLElement;
  if (previousErrorMessageElement) {
    loadingElement.removeChild(previousErrorMessageElement);
  }

  // Remove the loading dots (surrounding with if-statement safety check in case this is invoked twice)
  const loadingDotsElement = document.querySelectorAll(
    '#loading .loading-indicator',
  )[0] as HTMLElement;
  if (loadingDotsElement) {
    loadingDotsElement.parentNode!.removeChild(loadingDotsElement);
  }

  rootElement!.style.display = 'none';

  return true;
}
