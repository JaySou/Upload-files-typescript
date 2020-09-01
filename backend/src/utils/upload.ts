import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import moment from 'moment';

export default {
  dest: path.resolve(__dirname, '..', 'uploads'),
  storage: multer.diskStorage({
    destination: (req: any, file: any, call: any) => {
      call(null, path.resolve(__dirname, '..', 'uploads'))
    },
    filename: (req: any, file: any, call: any) => {
      crypto.randomBytes(16, (err, hash) => {

        const agora = moment(new Date()).format('YYYYMMDDhhmmssSSS')
        const extension = file.originalname.split('.')[ file.originalname.split('.').length -1 ]
        const primary_name = file.originalname.replace(`.${extension}`, '')

        if(err) call(err)
        const filename = `${primary_name}_${agora}_${hash.toString('hex')}.${extension}`
        call(null, filename)
      })
    }
  }),
  fileFilter: (req: any, file: any, call: any) => {

    const compare = file.originalname.match(/.*\.(xlsx|xls)$/i)

    if(!compare) {
      call(new Error("Invalid file type"))
    }
    else {
      call(null, true)
    }
  }
}