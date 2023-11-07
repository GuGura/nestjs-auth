import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

const { combine, timestamp, printf } = winston.format;

const logDir = 'logs'; // logs 디렉토리 하위에 로그 파일 저장
const logFormat = printf(
  (info) => `${info.timestamp} ${info.label} ${info.level}: ${info.message}`,
);

const options = {
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transport: [
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: '%DATE%.log',
      maxFiles: 7, // 7일치 로그 파일 저장
      zippedArchive: true,
    }),
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/error`, // error.log 파일은 /logs/error 하위에 저장
      filename: '%DATE%.error.log',
      maxFiles: 7,
      zippedArchive: true,
    }),
  ],
};
export default options;
