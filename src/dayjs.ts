import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";

// extend dayjs with relativeTime plugin
dayjs.locale("ru");
dayjs.extend(relativeTime);
dayjs.extend(duration);
