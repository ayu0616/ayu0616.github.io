import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { cn } from '../../../lib/utils'
import { Clock } from './clock'
import { useClock } from './use-clock'

dayjs.extend(duration)

export const JapanWeekendClock = () => {
    const datetime = useClock()
    const seconds =
        datetime.hour() * 3600 + datetime.minute() * 60 + datetime.second()
    const weekDay = datetime.day()
    const isWeekend = weekDay === 0 || weekDay === 6
    const nextWeekend = datetime
        .set('day', 6)
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
    return (
        <div className="space-y-4">
            <h1>日本週末時計</h1>
            {isWeekend ? (
                <div>
                    <div className={cn('text-2xl text-red-600')}>
                        週末です！
                    </div>
                </div>
            ) : (
                <>
                    <ul className="space-y-0">
                        <li>次の週末： {nextWeekend.format('YYYY/MM/DD')}</li>
                        <li>
                            週末まで：{' '}
                            {dayjs
                                .duration(nextWeekend.diff(datetime))
                                .format('D日HH時間mm分ss秒')}
                        </li>
                        <li>
                            週末まで： {nextWeekend.diff(datetime, 'seconds')}秒
                        </li>
                    </ul>
                    <div className="grid grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5].map((wd) => (
                            <Clock
                                key={wd}
                                seconds={wd === weekDay ? seconds : 0}
                                disabled={wd < weekDay}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
