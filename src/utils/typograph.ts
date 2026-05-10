/**
 * Replaces regular spaces after short function words (prepositions,
 * conjunctions, particles) with non-breaking spaces (\u00A0) so these
 * words never hang alone at the end of a line.
 *
 * Supports both Russian and English text.
 */
export function typograph(text: string): string {
  let r = text;

  // Two passes to handle consecutive short words (e.g. "и в магазин")
  for (let i = 0; i < 2; i++) {
    // Russian: prepositions, conjunctions, particles
    // Uses space/start boundary since \b doesn't work for Cyrillic
    r = r.replace(
      /(^|[\s\u00A0])(или|и|в|с|к|у|о|об|а|на|не|но|из|по|за|от|до|для|при|без|под|над|что|как|так|это|все|уже|ещё|еще|бы|ли|же|ни) /gim,
      '$1$2\u00A0',
    );

    // English: articles, prepositions, conjunctions, short verbs
    r = r.replace(
      /\b(a|an|the|in|on|at|to|for|of|with|by|from|up|out|as|and|or|but|nor|so|if|is|be|was|were|not) /gi,
      '$1\u00A0',
    );
  }

  // Non-breaking hyphen (U+2011) inside the brand "\u0422-\u0411\u0430\u043D\u043A" / "T-Bank"
  // so it never wraps as "\u0422-" + "\u0411\u0430\u043D\u043A" across two lines.
  r = r.replace(/\u0422-\u0411\u0430\u043D\u043A/g, '\u0422\u2011\u0411\u0430\u043D\u043A');
  r = r.replace(/T-Bank/g, 'T\u2011Bank');

  return r;
}
