import Component from './Preview';
import PreviewToast from './PreviewToast';
import '@fontsource-variable/plus-jakarta-sans';
import './styles.css';

/** Copy this entire folder and import this entry point. */
export default function DestinationStack() {
  return <div className="sc-package-destination-stack"><PreviewToast><Component /></PreviewToast></div>;
}
