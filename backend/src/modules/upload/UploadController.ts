import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import xlsx from 'xlsx';

class UploadController {

  upload = async (req: Request, res: Response) => {
    try {

      return res.status(200).json({ message: 'Upload realizado com sucesso!' })

    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  index = async (req: Request, res: Response) => {
    try {

      const uploads = path.resolve(__dirname, '..', '..', 'uploads');
      const files = fs.readdirSync(uploads, 'utf8')
        .map((filename: string) => ({ filename }))
      return res.status(200).json(files)

    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  show = async (req: Request, res: Response) => {
    try {

      const filename = req.params.filename

      const page = Number(req.query.page) || 1
      const list = Number(req.query.list) || 100

      const file = path.join(__dirname, '..', '..', 'uploads', filename);
      const workbook = xlsx.readFile(file)
      const sheetName = workbook.SheetNames[0]
      const dtJson = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const count = dtJson.length
      const pages = Math.ceil(dtJson.length / list)
      const current = page
      const preview = (page - 1) === 0 ? 0 :(page - 1)
      const next = (page + 1) === pages ? 0 : (page + 1)
      const init = (page * list) - list
      const finish = init + (list - 1)

      const result = dtJson.filter((item, indice) => indice >= init && indice <= finish)

    return res.status(200).json({count , pages, current, preview, next, data: result })

  } catch(e) {
    res.status(400).json({ error: e.message })
  }
}
}

export default new UploadController()