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

      const uploads = path.join(__dirname, '..', '..', 'uploads');
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

      const file = path.join(__dirname, '..', '..', 'uploads', filename);
      const workbook = xlsx.readFile(file)
      const sheetName = workbook.SheetNames[0]
      const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      return res.status(200).json(data)

    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }
}

export default new UploadController()