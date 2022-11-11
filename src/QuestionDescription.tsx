import React from 'react';
import { BeliefKeyT } from './store/state';

interface Props {
  belief: keyof BeliefKeyT;
}

export const QuestionDescription: React.FC<Props> = ({ belief }) => {
  const descrption: string = (() => {
    switch (belief) {
      case 'v2xpa_popul':
        return 'To what extent do representatives of the party use populist rhetoric (narrowly defined)?';
      case 'v2xpa_antiplural':
        return 'To what extent does the party show a lacking commitment to democratic norms prior to elections?';
      case 'v2paanteli':
        return 'How important is anti-elite rhetoric for this party?';
      case 'v2papeople':
        return 'Do leaders of this party glorify the ordinary people and identify themselves as part of them?';
      case 'v2paopresp':
        return 'Prior to this election, have leaders of this party used severe personal attacks or tactics of demonization against their opponents?';
      case 'v2paplur':
        return 'Prior to this election, to what extent was the leadership of this political party clearly committed to free and fair elections with multiple parties, freedom of speech, media, assembly and association?';
      case 'v2paminor':
        return ' According to the leadership of this party, how often should the will of the majority be implemented even if doing so would violate the rights of minorities?';
      case 'v2paviol':
        return 'To what extent does the leadership of this party explicitly discourage the use of violence against domestic political opponents?';
      case 'v2paimmig':
        return "What is the party's position regarding immigration into the country?";
      case 'v2palgbt':
        return "What is this party's position toward social equality for the lesbian, gay, bisexual, and transgender (LGBT) community?";
      case 'v2paculsup':
        return 'To what extent does the party leadership promote the cultural superiority of a specific social group or the nation as a whole?';
      case 'v2parelig':
        return 'To what extent does this party invoke God, religion, or sacred/religious texts to justify its positions?';
      case 'v2pagender':
        return 'What is the share of women in national-level leadership positions of this political party?';
      case 'v2pawomlab':
        return 'To what extent does this party support the equal participation of women in the labor market?';
      case 'v2pariglef':
        return 'Please locate the party in terms of its overall ideological stance on economic issues.';
      case 'v2pawelf':
        return 'To what extent does the party promote means-tested or universalistic welfare policies?';
    }
  })();

  return (
    <div className="level">
      <p>
        <strong>{descrption}</strong>{' '}
        <a href="https://www.v-dem.net/documents/6/vparty_codebook_v2.pdf">
          Learn more.
        </a>
      </p>
    </div>
  );
};
