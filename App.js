import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import TrackPlayer, {Capability, State} from 'react-native-track-player';
import Slider from '@react-native-community/slider';

const App = () => {
  const [phrases, setPhrases] = useState([]);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [timer, setTimer] = useState(null);
  const [audioPosition, setAudioPosition] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    async function setupPlayer() {
      try {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);

        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          stopWithApp: true,
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
        });
        await TrackPlayer.add({
          // id: 'audio-file',
          // url: 'https://file.notion.so/f/f/24407104-f114-40ec-91ac-25f0ac0ac7a6/66b62104-67d0-48a9-956a-2534f0c1f52a/example_audio.mp3?table=block&id=afdf8629-9de2-456c-8d1e-cecb5f63378d&spaceId=24407104-f114-40ec-91ac-25f0ac0ac7a6&expirationTimestamp=1732600800000&signature=NuSmpl8KKKNSpQ4ltJ2ylIGxvmbktnKd11h3U5omaKA&downloadName=example_audio.mp3',
          // title: 'Example Audio',
          // artist: 'Unknown',
          id: 'audio-file',
          url: Platform.OS === 'ios' ? require('./assets/Unstoppable.mp3') : require('./assets/Unstoppable.mp3'),
          title: 'Track Title',
          artist: 'Artist Name',
          artwork: require('./assets/Pause.png'),
        });

        const interleavedPhrases = [];

        const sampleMetadata = {
          pause: 250,
          speakers: [
            {
              name: 'John',
              phrases: [
                {words: "All smiles, I know what it takes to fool this town", time: 0},
                {words: "And all through the nighttime", time: 17.985},
                {words: "Oh, yeah, I'll tell you what you wanna hear", time: 22.57},
                {words: "It's never the right time", time: 28.767},
                {words: "I put my armor on, show you how strong I am", time: 33.578},
                {words: "I'm unstoppable", time: 44.171},
                {words: "I'm invincible", time: 50.206},
                {words: "I'm so powerful", time: 56.305},
                {words: "I'm so confident", time: 61.27},
                {words: "Unstoppable today", time: 67.488},
                {words: "Unstoppable today", time: 73.648},
                {words: "Break down, only alone I will cry out loud", time: 78.449},
                {words: "Hiding out deep down", time: 84.622},
                {words: "I know, I've heard that to let your feelings show", time: 89.153},
                {words: "But I'm too afraid now", time: 95.382},
                {words: "I put my armor on, show you how strong I am", time: 100.046},
                {words: "I'm unstoppable", time: 111.0},
                {words: "I'm invincible", time: 116.703},
                {words: "I'm so powerful", time: 121.883},
                {words: "I'm so confident", time: 127.767},
                {words: "Unstoppable today", time: 132.921},
                {words: "Unstoppable today", time: 138.977},
                {words: "Unstoppable today", time: 144.734},
                {words: "Unstoppable today", time: 150.002},
                {words: "I put my armor on, show you how strong I am", time: 155.374},
                {words: "I'm unstoppable", time: 167.453},
                {words: "I'm invincible", time: 173.216},
                {words: "I'm so powerful", time: 178.711},
                {words: "I'm so confident", time: 184.186},
                {words: "Unstoppable today", time: 190.001},
                {words: "Unstoppable today", time: 195.749},
                {words: "Unstoppable today", time: 201.073},
                {words: "Unstoppable today", time: 206.955},
              ],
            },
            {
              name: 'Jack',
              phrases: [
                {words: "I'll do it 'til the sun goes down", time: 15.67},
                {words: "Oh, yeah", time: 20.153},
                {words: "Leave my sunglasses on while I shed a tear", time: 25.818},
                {words: "Yeah, yeah", time: 32.147},
                {words: "I put my armor on, I'll show you that I am", time: 38.662},
                {words: "I'm a Porsche with no brakes", time: 47.43},
                {words: "Yeah, I win every single game", time: 52.625},
                {words: "I don't need batteries to play", time: 58.513},
                {words: "Yeah, I'm unstoppable today", time: 63.828},
                {words: "Unstoppable today", time: 70.046},
                {words: "I'm unstoppable today", time: 75.886},
                {words: "You'll never see what's hiding out", time: 81.931},
                {words: "Yeah, yeah", time: 86.644},
                {words: "Is the only way to make friendships grow", time: 92.569},
                {words: "Yeah, yeah", time: 97.867},
                {words: "I put my armor on, I'll show you that I am", time: 105.256},
                {words: "I'm a Porsche with no brakes", time: 114.358},
                {words: "Yeah, I win every single game", time: 118.926},
                {words: "I don't need batteries to play", time: 124.519},
                {words: "Yeah, I'm unstoppable today", time: 129.69},
                {words: "Unstoppable today", time: 136.283},
                {words: "I'm unstoppable today", time: 141.555},
                {words: "Unstoppable today", time: 147.34},
                {words: "I'm unstoppable today", time: 152.584},
                {words: "I put my armor on, I'll show you that I am", time: 161.02},
                {words: "I'm a Porsche with no brakes", time: 169.913},
                {words: "Yeah, I win every single game", time: 176.108},
                {words: "I don't need batteries to play", time: 180.792},
                {words: "Yeah, I'm unstoppable today", time: 186.773},
                {words: "Unstoppable today", time: 192.321},
                {words: "I'm unstoppable today", time: 198.041},
                {words: "Unstoppable today", time: 203.748},
                {words: "I'm unstoppable today", time: 210.028},
              ],
            },
          ],
        };

        let indexJohn = 0;
        let indexJack = 0;
        while (
          indexJohn < sampleMetadata.speakers[0].phrases.length ||
          indexJack < sampleMetadata.speakers[1].phrases.length
        ) {
          if (indexJohn < sampleMetadata.speakers[0].phrases.length) {
            interleavedPhrases.push({
              speaker: 'John',
              ...sampleMetadata.speakers[0].phrases[indexJohn],
            });
            indexJohn++;
          }
          if (indexJack < sampleMetadata.speakers[1].phrases.length) {
            interleavedPhrases.push({
              speaker: 'Jack',
              ...sampleMetadata.speakers[1].phrases[indexJack],
            });
            indexJack++;
          }
        }

        setPhrases(interleavedPhrases);
        TrackPlayer.addEventListener('playback-queue-ended', () => {
          setIsPlaying(false);
        });
      } catch (err) {
        console.error('Error setting up TrackPlayer:', err);
      }
    }

    setupPlayer();

    return () => {
      if (timer) clearInterval(timer);
      setIsPlaying(false);
      // TrackPlayer.destroy();
    };
  }, []);

  const startSyncing = () => {
    if (timer) clearInterval(timer);

    const newTimer = setInterval(async () => {
      const position = await TrackPlayer.getPosition();
      const duration = await TrackPlayer.getDuration();
      setAudioPosition(position);
      setAudioDuration(duration);

      let matchedIndex = -1;

      for (let i = 0; i < phrases.length; i++) {
        if (position >= phrases[i].time) {
          matchedIndex = i;
        } else {
          break;
        }
      }

      if (matchedIndex !== -1 && matchedIndex !== currentPhraseIndex) {
        setCurrentPhraseIndex(matchedIndex);
      }
    }, 100);

    setTimer(newTimer);
  };

  const handlePlay = async () => {
    setIsPlaying(true);
    try {
      const state = await TrackPlayer.getState();
      const position = await TrackPlayer.getPosition();
      const duration = await TrackPlayer.getDuration();

      if (
        state === State.Paused ||
        (state === State.Stopped && position < duration)
      ) {
        await TrackPlayer.play();
        startSyncing();
      } else if (state === State.Stopped || position >= duration) {
        await TrackPlayer.seekTo(0);
        await TrackPlayer.play();
        startSyncing();
      } else {
        await TrackPlayer.play();
        startSyncing();
      }
    } catch (err) {
      console.error('Error playing audio:', err);
    }
  };

  const handlePause = async () => {
    setIsPlaying(false);
    try {
      await TrackPlayer.pause();
      if (timer) clearInterval(timer);
    } catch (err) {
      console.error('Error pausing audio:', err);
    }
  };

  const handleRewind = async () => {
    const newIndex = Math.max(0, currentPhraseIndex - 1);
    setCurrentPhraseIndex(newIndex);
    const phrase = phrases[newIndex];

    await TrackPlayer.seekTo(phrase.time);
  };

  const handleForward = async () => {
    const newIndex = Math.min(phrases.length - 1, currentPhraseIndex + 1);
    setCurrentPhraseIndex(newIndex);
    const phrase = phrases[newIndex];
    await TrackPlayer.seekTo(phrase.time);
  };

  const handleSeek = async value => {
    await TrackPlayer.seekTo(value);
    setAudioPosition(value);
  };
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getVisiblePhrases = () => {
    const start = Math.max(0, currentPhraseIndex - 4);
    const end = Math.min(phrases.length, currentPhraseIndex + 6);
    return phrases.slice(start, end);
  };
  return (
    <View style={styles.container}>
      <View style={styles.bgShadow} />
      <View style={{padding: 20}}>
        <FlatList
          data={getVisiblePhrases()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View>
              <Text
                style={[
                  styles.phraseText,
                  // currentPhraseIndex === index
                  phrases[currentPhraseIndex] === item
                    ? styles.highlightedname
                    : styles.bgName,
                  item.speaker === 'Jack'
                    ? styles.rightAlignedmargin
                    : styles.leftAligned,
                ]}>
                {item.speaker}
              </Text>

              <Text
                style={[
                  styles.phraseText,
                  // currentPhraseIndex === index
                  phrases[currentPhraseIndex] === item
                    ? styles.highlighted
                    : styles.bgText,
                  item.speaker === 'Jack'
                    ? styles.rightAligned
                    : styles.leftAligned,
                ]}>
                {item.words}
              </Text>
            </View>
          )}
        />
      </View>
      <View
        style={{
          backgroundColor: '#F6F6F9',
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <View style={styles.progressBar}>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={audioDuration}
              value={audioPosition}
              onValueChange={handleSeek}
              minimumTrackTintColor="#DBA604"
              maximumTrackTintColor="#ECEEFF"
              thumbTintColor="transparent"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text style={styles.progressText}>{formatTime(audioPosition)}</Text>
            <Text style={styles.progressText}>{formatTime(audioDuration)}</Text>
          </View>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={handleRewind}>
            <Image
              source={require('./assets/Rewind.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          {isPlaying ? (
            <TouchableOpacity style={styles.pausebutton} onPress={handlePause}>
              <Image
                source={require('./assets/Pause.png')}
                style={styles.pauseImage}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handlePlay}>
              <Image
                source={require('./assets/Play.png')}
                style={styles.playImage}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={handleForward}>
            <Image
              source={require('./assets/Forward.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginTop: 20,backgroundColor:'#fff'},
  phraseText: {
    fontSize: 17,
    marginVertical: 5,
    fontWeight: 600,
    lineHeight: 21.42,
  },
  highlighted: {
    fontWeight: '600',
    color: '#DBA604',
    backgroundColor: '#E1E4FF',
    padding: 10,
    borderRadius: 10,
    borderColor: '#F2EEF6',
    borderWidth: 1,
  },
  bgShadow: {
    elevation: 50,
    shadowColor: 'black',
    width: 'auto',
    height: 1,
  },
  bgText: {
    fontWeight: '600',
    color: '#1B1B1B',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    borderColor: '#F2EEF6',
    borderWidth: 1,
  },
  highlightedname: {
    color: '#DBA604',
    fontWeight: '600',
    fontSize: 15,
  },
  bgName: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 15,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pausebutton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E1E4FF',
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  image: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  playImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  pauseImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: '#DBA604',
  },
  leftAligned: {
    textAlign: 'left',
    marginRight: 100,
  },
  rightAligned: {
    marginLeft: 100,
  },
  rightAlignedmargin: {
    textAlign: 'right',
    marginLeft: 100,
  },
  progressBar: {
    width: '100%',
  },
  progressText: {
    color: 'gray',
    marginTop: 5,
  },
  sliderContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  slider: {
    height: 0,
  },
});

export default App;