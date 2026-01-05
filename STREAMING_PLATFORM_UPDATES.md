# Streaming Platform Direct Links & Survey Improvements

## Changes Made

### 1. Direct Streaming Platform Links ✅

**Problem**: All streaming service clicks were opening TMDB watch pages instead of the actual streaming platforms (Netflix, Hulu, Disney+, etc.)

**Solution**: Created platform-specific URL mapping system that generates direct links to each streaming service's search page.

**Supported Platforms** (12 total):
- ✅ **Netflix** → `https://www.netflix.com/search?q={title}`
- ✅ **Hulu** → `https://www.hulu.com/search?q={title}`
- ✅ **Disney+** → `https://www.disneyplus.com/search?q={title}`
- ✅ **Amazon Prime** → `https://www.amazon.com/s?k={title}&i=instant-video`
- ✅ **HBO Max/Max** → `https://www.max.com/search?q={title}`
- ✅ **Apple TV+** → `https://tv.apple.com/search?q={title}`
- ✅ **Paramount+** → `https://www.paramountplus.com/search/?query={title}`
- ✅ **Peacock** → `https://www.peacocktv.com/search?q={title}`
- ✅ **Showtime** → `https://www.showtime.com/search/{title}`
- ✅ **Starz** → `https://www.starz.com/us/en/search?query={title}`
- ✅ **Crunchyroll** → `https://www.crunchyroll.com/search?q={title}`
- ✅ **Funimation** → `https://www.funimation.com/search/?q={title}`

**Implementation**:
```typescript
const getStreamingPlatformUrl = (providerName: string, title: string): string => {
  const encodedTitle = encodeURIComponent(title);
  const lowerProvider = providerName.toLowerCase();
  
  if (lowerProvider.includes('netflix')) {
    return `https://www.netflix.com/search?q=${encodedTitle}`;
  }
  // ... more platforms
}
```

**Console Logging**: Added debug logs to track which platform URLs are being opened:
```
[DecisionCard] Opening Netflix: https://www.netflix.com/search?q=The%20Umbrella%20Academy
```

---

### 2. Entertainment Survey Improvements ✅

**Problem**: Survey only worked for "Watch something" intent. Other entertainment types (games, music, books) had no questions.

**Solution**: Added conditional question rendering based on user's intent selection.

**New Question Types**:

#### Games (when intent = 'play')
- Action/Adventure
- RPG
- Strategy
- Sports
- Puzzle
- Multiplayer

#### Music (when intent = 'listen')
- Pop
- Rock
- Hip Hop
- Electronic
- Jazz
- Classical
- Country
- Indie

#### Books (when intent = 'read')
- Fiction
- Mystery
- Sci-Fi/Fantasy
- Biography
- Self-Help
- History
- Romance
- Thriller

**Technical Implementation**:
```typescript
// In categories.ts
{
  id: 'gameType',
  text: 'What type of game?',
  type: 'single',
  options: [...],
  showIf: (answers: any) => answers.intent === 'play',
}

// In FlowSurvey.tsx
const visibleQuestions = category.questions.filter(q => {
  if (typeof q.showIf === 'function') {
    return q.showIf(answers);
  }
  return true;
});
```

**Type Definition Update**:
```typescript
export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multi' | 'text' | 'range';
  options?: { value: string; label: string }[];
  placeholder?: string;
  showIf?: (answers: Record<string, any>) => boolean; // NEW
}
```

---

## Testing

### Test Streaming Links:
1. Start TD² flow for Entertainment
2. Select "Watch something" → "TV Series"
3. Complete survey
4. Click dropdown on any recommendation
5. Click a streaming service (Netflix, Hulu, etc.)
6. **Expected**: Opens that platform's search page for the title
7. **Check console**: Should see `[DecisionCard] Opening {Platform}: {URL}`

### Test Conditional Survey:
1. **Watch Intent**:
   - Select "Watch something"
   - Should see: Media Type → Genre → Mood questions
   
2. **Play Intent**:
   - Select "Play a game"
   - Should see: Game Type → Mood questions
   
3. **Listen Intent**:
   - Select "Listen to music"
   - Should see: Music Genre → Mood questions
   
4. **Read Intent**:
   - Select "Read a book"
   - Should see: Book Genre → Mood questions

---

## Known Limitations

### Streaming Platform Deep Linking:
- **Why search URLs?** Most streaming platforms don't provide public deep-linking APIs to specific content without authentication
- **User Experience**: Users land on search results page → click the exact show/movie → starts playing
- **Alternative**: TMDB watch page (JustWatch aggregator) still available as "More Details" option in dropdown

### Content Discovery:
- Games/Music/Books use AI recommendations with Unsplash images (no dedicated APIs integrated yet)
- Future enhancement: Integrate IGDB (games), Spotify (music), Google Books (books) APIs

---

## Files Modified

1. **src/components/td2/DecisionCard.tsx**
   - Added `getStreamingPlatformUrl()` function
   - Updated dropdown click handlers to use platform URLs
   - Added console logging for debugging

2. **src/data/categories.ts**
   - Added `gameType`, `musicGenre`, `bookGenre` questions
   - Made questions conditional with `showIf` property
   - Updated `genre` question to only show for watch intent

3. **src/components/td2/FlowSurvey.tsx**
   - Added `visibleQuestions` filtering logic
   - Updated all callbacks to use filtered questions
   - Dynamic progress calculation based on visible questions

4. **src/types/td2.ts**
   - Added optional `showIf` function to `Question` interface

---

## Console Debug Output

When testing, you should see logs like:

```
[DecisionCard] "WandaVision": {
  hasImage: true,
  hasSourceUrl: true,
  hasStreamingServices: true,
  hasRentalServices: false,
  hasPurchaseServices: false,
  sourceUrl: "https://www.themoviedb.org/tv/85271-wandavision/watch?locale=US",
  tmdbLink: "https://www.themoviedb.org/tv/85271"
}

[DecisionCard] Opening Disney+: https://www.disneyplus.com/search?q=WandaVision
```

This helps diagnose:
- Which items have streaming data
- Which platform URLs are being generated
- Whether fallbacks are being used

---

## Next Steps (Optional Enhancements)

1. **Add more streaming platforms**: 
   - Vudu, YouTube Premium, AMC+, etc.
   
2. **Integrate dedicated APIs**:
   - IGDB API for games
   - Spotify/Apple Music API for music
   - Google Books API for books
   
3. **Geolocation-based streaming**:
   - Show platforms available in user's region
   - Currently hardcoded to US (TMDB watch/providers US region)

4. **Platform availability badges**:
   - Show "Free with subscription" vs "Rent $3.99" vs "Buy $14.99"
   - TMDB provides this data, just needs UI implementation
