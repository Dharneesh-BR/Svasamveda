import React, { useMemo } from 'react';

const SessionCard = ({ session }) => {
  const title = session?.title || 'Untitled Session';
  const instructorLine = useMemo(() => {
    const primary = session?.instructor || session?.host || '';
    const secondary = session?.coInstructor || session?.guest || '';
    if (primary && secondary) return `${primary} & ${secondary}`;
    return primary || secondary || '';
  }, [session]);

  const tags = Array.isArray(session?.tags) ? session.tags : [];
  const lives = session?.livesTransformed ?? session?.lives ?? null;
  const isLive = Boolean(session?.isLive || session?.live || session?.liveSession);
  const recordingAvailable = Boolean(session?.recordingAvailable || session?.recording);

  const dateLabel = session?.dateLabel || session?.date || '';
  const timeLabel = session?.time || '';
  const durationLabel = session?.durationLabel || (typeof session?.duration === 'number' ? `${session.duration} Minutes` : session?.duration || '');

  const price = typeof session?.price === 'number' ? session.price : session?.price ? Number(session.price) : null;
  const priceLabel = price && !Number.isNaN(price) ? `₹${price.toLocaleString('en-IN')}` : 'Free';
  const priceSuffix = session?.priceSuffix || 'per session';

  return (
    <div className="rounded-2xl overflow-hidden bg-[#F7EEF5] shadow-[0_18px_45px_-25px_rgba(0,0,0,0.55)] border border-black/5">
      {/* Header image */}
      <div className="relative h-52">
        <img
          src={session?.image || session?.imageUrl || '/placeholder-session.jpg'}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />

        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-white text-2xl font-extrabold leading-tight line-clamp-2">
              {title}
            </h3>
            {instructorLine ? (
              <div className="mt-2">
                <div className="text-white/95 text-base font-extrabold uppercase tracking-wide line-clamp-1">
                  {instructorLine}
                </div>
                {session?.instructorSubtitle ? (
                  <div className="text-white/80 text-sm mt-0.5 line-clamp-2">
                    {session.instructorSubtitle}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Lives transformed strip */}
      <div className="relative bg-gradient-to-r from-[#2B0B3C] via-[#6B1E70] to-[#B42A6B] text-white px-4 py-3">
        <div className="text-sm font-semibold">
          {lives ? (
            <>
              <span className="font-extrabold">{String(lives).includes('+') ? lives : `${lives}+`}</span> Lives Transformed
            </>
          ) : (
            <>
              <span className="font-extrabold">700+</span> Lives Transformed
            </>
          )}
        </div>

        {isLive ? (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center rounded-full bg-red-600 text-white text-xs font-extrabold px-4 py-1.5 shadow">
            LIVE SESSION
          </span>
        ) : null}
      </div>

      {/* Tags */}
      {tags.length > 0 ? (
        <div className="px-4 pt-4 flex flex-wrap gap-3">
          {tags.slice(0, 4).map((tag, idx) => (
            <span
              key={`${tag}-${idx}`}
              className="px-4 py-2 rounded-full text-xs font-extrabold tracking-wide border border-[#D6B0CF] text-gray-800 bg-white/75"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {/* Footer info */}
      <div className="px-4 pb-5 pt-4">
        <div className="grid grid-cols-2 gap-4 items-start">
          <div>
            {dateLabel ? (
              <div className="text-xl font-extrabold text-gray-900">{dateLabel}</div>
            ) : (
              <div className="text-xl font-extrabold text-gray-900">&nbsp;</div>
            )}
            <div className="text-base text-gray-700">
              {[timeLabel, durationLabel].filter(Boolean).join(', ')}
            </div>
          </div>

          <div className="border-l border-black/10 pl-4">
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-extrabold text-gray-900">{priceLabel}</div>
              <div className="text-xs text-gray-600">{priceSuffix}</div>
            </div>
            {recordingAvailable ? (
              <div className="text-base text-gray-700 mt-1">Recording Available</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
