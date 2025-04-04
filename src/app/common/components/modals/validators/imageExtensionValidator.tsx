import { RuleObject } from 'rc-field-form/lib/interface';

import { SUPPORTED_IMAGE_FILE_TYPES } from '@/app/common/constants/file-types.constants';

const imageExtensionValidator = (_: RuleObject, file: any): Promise<void> => {
    if (file) {
        let name = '';
        if (file.file) {
            name = file.file.name.toLowerCase();
        } else if (file.name) {
            name = file.name.toLowerCase();
        }

        const allowedExtensions = ['.jpeg', '.png', '.webp', '.jpg'];

        if (name === '' || allowedExtensions.some((ext) => name.endsWith(ext))) {
            return Promise.resolve();
        }

        return Promise.reject(new Error('Тільки файли з розширенням webp, jpeg, png, jpg дозволені!'));
    }

    return Promise.reject();
};

export const checkImageFileType = (type: string | undefined) => type && SUPPORTED_IMAGE_FILE_TYPES.includes(type);

export default imageExtensionValidator;
