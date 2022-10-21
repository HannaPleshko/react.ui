import DownloadButton from './DownloadButton';
import SaveButton from './SaveButton';
import { useAppSelector } from '../../../../../hooks/redux';

function FooterButtons() {
  const resumes = useAppSelector((state) => state.resumeUtils.resumes);
  const isVisiable = resumes?.length;
  return (
    <>
      <SaveButton isSaved={isVisiable !== 0} />
      {isVisiable ? <DownloadButton /> : null}
    </>
  );
}

export default FooterButtons;
